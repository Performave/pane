package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/ericwang401/pane/network"
)

func index(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, os.Getenv("IP_V4"))

	for name, headers := range req.Header {
		for _, h := range headers {
			fmt.Fprintf(w, "%v: %v\n", name, h)
		}
	}
}

func sendPing(w http.ResponseWriter, req *http.Request) {
	fmt.Println(network.Ping("www.google.com"))

	fmt.Fprintf(w, "ran")
}

func registerRoutes() {
	http.Handle("/", http.FileServer(http.Dir("./public")))
	http.HandleFunc("/view-headers", index)
	http.HandleFunc("/network/ping", sendPing)
}
