package network

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
)

type IP struct {
	Query string
}

func getIp4() string {
	req, err := http.Get("http://ip-api.com/json/")
	if err != nil {
		return err.Error()
	}
	defer req.Body.Close()

	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		return err.Error()
	}

	var ip IP
	json.Unmarshal(body, &ip)

	return ip.Query
}

func FetchPublicAddresses() string {
	return getIp4()
}
