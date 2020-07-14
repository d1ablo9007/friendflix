# 🎉Friendflix

> Watch Netflix simultaneously with your friends!

## How to install/build

- Clone repository `git clone https://github.com/d1ablo9007/friendflix.git`
- CD to cloned repository `cd friendflix`
- Be sure to run `npm install`
- To build the extension run `npm run build`
- To build the extension and run the server `npm run dev`
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

## Credits

All credits goes towards Jonnylin13's LongDistance repository.
Check out the Jonnylin13 [LongDistance](https://github.com/jonnylin13/LongDistance) 
