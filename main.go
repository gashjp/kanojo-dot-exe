package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/gashjp/kanojo-dot-exe/statik"
	"github.com/rakyll/statik/fs"
)

// a
const (
	PATHAPI = "/api/"
	PATHWEB = "/web/"
)

func main() {
	mux := http.NewServeMux()
	mux.Handle(PATHAPI, http.HandlerFunc(apiHandler))
	mux.Handle(PATHWEB, http.HandlerFunc(webHandler))
	mux.Handle("/", http.HandlerFunc(indexHandler))
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

	log.Printf("Listening on port %s", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), mux))
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	fmt.Fprint(w, "index handler")
}

func apiHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "api handler")
}

func webHandler(w http.ResponseWriter, r *http.Request) {
	log.Printf("web handler %s", r.URL.Path)
	fs, err := fs.New()
	if err != nil {
		fmt.Printf(err.Error() + " a\n")
		return
	}
	fileServer := http.StripPrefix("/web/", http.FileServer(fs))
	fileServer.ServeHTTP(w, r)
}
