package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	network "github.com/ericwang401/pane/services"
	"github.com/joho/godotenv"
)

func index(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, os.Getenv("IP_V4"))
	for name, headers := range req.Header {
		for _, h := range headers {
			fmt.Fprintf(w, "%v: %v\n", name, h)
		}
	}
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Some error occured. Err: %s", err)
	}

	http.Handle("/", http.FileServer(http.Dir("./public")))
	http.HandleFunc("/view-headers", index)

	fmt.Println(network.FetchPublicAddresses())

	fmt.Println("Registered routes")

	http.ListenAndServe("127.0.0.1:80", nil)
}
