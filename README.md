<h1 align="center"><img src="https://imgur.com/L8Ng6yw.png" width="400" alt="Logo"></h1>

> 😋 A beautiful server preview page for customers of hosting companies to view and test before buying

### ✨ Screenshot

![Screenshot](https://imgur.com/j9xpPJL.png)

## Install

If you have not already installed Docker, please install it from [Docker.com](https://docker.com)


🚨 **WARNING: YOUR APP_KEY HAS TO INCLUDE UPPERCASE AND LOWERCASE LETTERS, NUMBERS, AND BE AT LEAST 15 CHARACTERS LONG. IF CONDITION NOT SATISFIED, SERVER WILL NOT START DUE TO SECURITY ERROR.**

🚨 Also, Pane works only on Linux. Docker on Windows does not work even though it should (due to the different firewall on Windows).

🚨 The APP_KEY cannot contain special characters, only alphabetical characters.

```sh
docker pull performave/pane:latest

docker run -d --restart unless-stopped \
-p 80:80 \
-e HOST=0.0.0.0 \
-e PORT=80 \
-e APP_KEY=YOURKEY \
-e NODE_ENV=production \
-e NAME='YOURNAME' \
-e LOCATION='YOURLOCATION' \
-e IP_V4='YOURIP (CAN BE BLANK)' \
-e IP_V6='YOURIP (CAN BE BLANK)' \
performave/pane:latest
```

## Author

👤 **Eric Wang**

* Website: https://performave.com
* Github: [@ericwang401](https://github.com/ericwang401)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/performave/pane/issues).

## Show your support

Give a ⭐️ if this app helped you!

Please donate to [my Patreon](https://www.patreon.com/performave) to help let me keep working on these amazing open-source projects!

## 📝 License

Copyright © 2022 [Eric Wang](https://github.com/ericwang401).<br />
This project is [MIT](https://github.com/performave/pane/blob/main/LICENSE) licensed.
