# Car Brand Logos

This directory contains logo images for car brands displayed on the website. Please add the following logo files with transparent backgrounds (PNG format recommended):

- toyota.png
- honda.png
- bmw.png
- mercedes.png
- audi.png
- lexus.png
- mitsubishi.png
- suzuki.png
- nissan.png
- hyundai.png
- kia.png
- volkswagen.png

Each logo should be approximately 128x128 pixels in size for optimal display quality. The logos will be automatically resized and displayed in grayscale by default, with color appearing on hover.

## Alternative Approach

If you don't have the logo files, you can use a CDN service like Clearbit's logo service by modifying the logo paths in the JavaScript code. For example:

```javascript
// Change this:
logo: 'images/brands/toyota.png'

// To this:
logo: 'https://logo.clearbit.com/toyota.com'
```

This will automatically fetch the logo from the brand's website. Just replace 'toyota.com' with the appropriate domain for each brand.
