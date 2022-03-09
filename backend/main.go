package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Some error occured. Err: %s", err)
	}

	registerRoutes()

	fmt.Println("Registered routes")

	http.ListenAndServe("127.0.0.1:80", nil)
}
