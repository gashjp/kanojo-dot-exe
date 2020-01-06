package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"strconv"

	_ "github.com/gashjp/kanojo-dot-exe/statik"
	"github.com/rakyll/statik/fs"
)

// a
const (
	PATHAPI = "/api/"
	PATHWEB = "/web/"
)

var (
	p = flag.Int("port", 8080, "available: 8080,49152～65535")
)

func main() {

	flag.Parse()
	// port
	port := ""
	if *p <= 65535 && *p >= 49152 {
		port = strconv.Itoa(*p)
	} else {
		port = "8080"
	}

	mux := http.NewServeMux()
	mux.Handle(PATHAPI, http.HandlerFunc(apiHandler))
	mux.Handle(PATHWEB, http.HandlerFunc(webHandler))
	mux.Handle("/", http.HandlerFunc(indexHandler))

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
