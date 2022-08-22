package main

import (
	"context"
	"encoding/json"
	"flag"
	"log"
	"os"
	"os/signal"
	"sync"
	"syscall"
	"time"

	"github.com/Shopify/sarama"
	"github.com/alpacahq/alpaca-trade-api-go/v2/marketdata/stream"
	gofakeit "github.com/brianvoe/gofakeit/v6"
)

var monitoredSymbols = []string{
	"AAPL",
	// "MSFT",
	// "AMZN",
	// "TSLA",
	// "GOOGL",
	// "GOOG",
	// "NVDA",
	// "BRK.B",
	// "META",
	// "UNH",
}

func main() {
	useRealData := flag.Bool("use-real-data", false, "Use real data from the Alpaca API; otherwise use generated data for testing.")
	flag.Parse()

	alpacaAPIKey := os.Getenv("APCA_API_KEY_ID")
	alpacaAPISecretKey := os.Getenv("APCA_API_SECRET_KEY")

	if *useRealData {
		if alpacaAPIKey == "" {
			panic("APCA_API_KEY_ID must be set as an environment variable")
		}
		if alpacaAPIKey == "" {
			panic("APCA_API_SECRET_KEY must be set as an environment variable")
		}
	} else {
		log.Println("Running with synthetic data.")
	}

	var producer sarama.AsyncProducer
	var err error
	for {
		producer, err = sarama.NewAsyncProducer([]string{"kafka:9092"}, nil)
		if err == nil {
			break
		}
		log.Printf("Got error creating producer, will retry %s", err)
		time.Sleep(1 * time.Second)
	}

	tradeHandler := func(t stream.Trade) {
		bytes, err := json.Marshal(t)
		if err != nil {
			panic(err)
		}

		log.Printf("Producing record of trade: %s", string(bytes))

		producer.Input() <- &sarama.ProducerMessage{Topic: "trades", Key: nil, Value: sarama.ByteEncoder(bytes)}
	}

	quoteHandler := func(q stream.Quote) {
		bytes, err := json.Marshal(q)
		if err != nil {
			panic(err)
		}

		log.Printf("Producing record of quote: %s", string(bytes))

		producer.Input() <- &sarama.ProducerMessage{Topic: "quotes", Key: nil, Value: sarama.ByteEncoder(bytes)}
	}

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	if *useRealData {
		c := stream.NewStocksClient(
			"iex",
			stream.WithCredentials(alpacaAPIKey, alpacaAPISecretKey),
			stream.WithTrades(tradeHandler, monitoredSymbols...),
			// stream.WithQuotes(quoteHandler, monitoredSymbols...),
		)

		c.SubscribeToTrades(tradeHandler, monitoredSymbols...)
		c.SubscribeToQuotes(quoteHandler, monitoredSymbols...)

		if err := c.Connect(ctx); err != nil {
			log.Fatalf("could not establish connection, error: %s", err)
		}
		log.Println("established connection")

		<-c.Terminated()
	} else {
		var wg sync.WaitGroup
		wg.Add(2)
		go func() {
			defer wg.Done()
			for {
				select {
				case <-ctx.Done():
					return
				default:
					for _, s := range monitoredSymbols {
						tradeHandler(newMockTrade(s))
					}
					time.Sleep(500 * time.Millisecond)
				}
			}
		}()

		go func() {
			defer wg.Done()
			for {
				select {
				case <-ctx.Done():
					return
				default:
					for _, s := range monitoredSymbols {
						quoteHandler(newMockQuote(s))
					}
					time.Sleep(500 * time.Millisecond)
				}
			}
		}()

		wg.Wait()
	}
}

var tradeId int64

func newMockTrade(sym string) stream.Trade {
	tradeId++
	return stream.Trade{
		ID:         tradeId,
		Symbol:     sym,
		Exchange:   "V",
		Price:      gofakeit.Price(1, 100),
		Size:       uint32(gofakeit.Number(1, 100)),
		Timestamp:  time.Now(),
		Conditions: []string{"@"},
		Tape:       "C",
	}
}

func newMockQuote(sym string) stream.Quote {
	tradeId++
	return stream.Quote{
		Symbol:      sym,
		BidExchange: "V",
		BidPrice:    gofakeit.Price(1, 100),
		BidSize:     uint32(gofakeit.Number(1, 100)),
		AskExchange: "V",
		AskPrice:    gofakeit.Price(1, 100),
		AskSize:     uint32(gofakeit.Number(1, 100)),
		Timestamp:   time.Now(),
		Conditions:  []string{"@"},
		Tape:        "C",
	}
}
