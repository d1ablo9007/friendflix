# 🎉Friendflix

> Watch Netflix simultaneously with your friends!

## How to setup

- Clone repository `git clone https://github.com/d1ablo9007/friendflix.git`
- CD to cloned repository `cd friendflix`
- Install required dependencies `npm install`
- To build the chrome extension run `npm run build`
- To build the chrome extension and run the server `npm run dev`
- To run server only `npm run start`

## How to configure the server
To change the IP of the server

- Go to shared folder
- Open `constants.js`
- Scroll down to `WS_URL` (this represents your websocket server URL)
- Change IP to yours
- Rebuild the extension with `npm run build`

## How to add extension to chrome

- Navigate to chrome://extensions
- Click on "Load unpacked extension"
- Select the `build/` folder after building the extension

## Screenshots
![alt text](https://i.ibb.co/QPxHWZ6/last-ned.png)
![alt text](https://i.ibb.co/fkxGfHf/last-ned-1.png)
![alt text](https://i.ibb.co/7g1vtF3/last-ned-3.png)
![alt text](https://i.ibb.co/yn6tnTk/last-ned-2.png)

## Credits

All credits goes towards Jonnylin13's LongDistance repository.
Check out the Jonnylin13 [LongDistance](https://github.com/jonnylin13/LongDistance) 
