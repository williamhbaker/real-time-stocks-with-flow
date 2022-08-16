package main

import (
	"context"
	"encoding/json"
	"log"
	"os"

	"github.com/Shopify/sarama"
	"github.com/alpacahq/alpaca-trade-api-go/v2/marketdata/stream"
)

func main() {
	producer, err := sarama.NewAsyncProducer([]string{"localhost:9092"}, nil)
	if err != nil {
		panic(err)
	}

	tradeHandler := func(t stream.Trade) {
		bytes, err := json.Marshal(t)
		if err != nil {
			panic(err)
		}

		producer.Input() <- &sarama.ProducerMessage{Topic: "trades", Key: nil, Value: sarama.ByteEncoder(bytes)}
	}

	quoteHandler := func(q stream.Quote) {
		bytes, err := json.Marshal(q)
		if err != nil {
			panic(err)
		}

		producer.Input() <- &sarama.ProducerMessage{Topic: "quotes", Key: nil, Value: sarama.ByteEncoder(bytes)}
	}

	c := stream.NewStocksClient(
		"iex",
		stream.WithTrades(tradeHandler, "AAPL"),
		stream.WithQuotes(quoteHandler, "AAPL"),
		stream.WithCredentials(os.Getenv("APCA_API_KEY_ID"), os.Getenv("APCA_API_SECRET_KEY")),
	)

	if err := c.Connect(context.Background()); err != nil {
		log.Fatalf("could not establish connection, error: %s", err)
	}
	log.Println("established connection")

	<-c.Terminated()
}
