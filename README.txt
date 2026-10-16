MYCraft-JarLuminaire website

Files
  index.html   page structure
  style.css    all design and animation
  script.js    products, search, cart, WhatsApp order
  images/      product photos (replace any file, keep the same name)

Use
  Open index.html in a browser, or upload the whole folder to any web host (Netlify, Vercel, GitHub Pages, cPanel).

WhatsApp number
  In script.js find   var WA_NUMBER=''   and add the number with country code, no + sign, e.g. '919XXXXXXXXX'.

Products and prices
  In script.js edit the  var P=[ ... ]  list. Each row: category, name, description, price (0 = ask price), photo, tile colours.
  To add a photo, put it in images/ and add it to the IMG list at the top of the script.

Fonts load from Google Fonts, so an internet connection is needed to show them.
