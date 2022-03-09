package network

import "github.com/go-ping/ping"

func Ping(host string) *ping.Statistics {
	pinger, err := ping.NewPinger(host)
	pinger.SetPrivileged(true)
	if err != nil {
		panic(err)
	}

	pinger.Count = 5

	err = pinger.Run()
	if err != nil {
		panic(err)
	}

	return pinger.Statistics()
}
