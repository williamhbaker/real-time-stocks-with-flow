package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/alpacahq/alpaca-trade-api-go/v2/marketdata/stream"
)

func main() {
	tradeHandler := func(t stream.Trade) {
		bytes, _ := json.MarshalIndent(t, "", "\t")
		fmt.Println(string(bytes))
	}

	quoteHandler := func(q stream.Quote) {
		bytes, _ := json.MarshalIndent(q, "", "\t")
		fmt.Println(string(bytes))
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
