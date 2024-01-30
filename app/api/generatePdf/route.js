import { NextResponse, NextRequest } from 'next/server'
const logger = require('../../logger');


const puppeteer = require('puppeteer');
const fs = require('fs');

export async function POST(request) {
  logger.info("request method type : " + request.method)
  console.log(request)
  let data = await request.json()
  logger.info("data =========================================================> " + JSON.stringify(data));


  const urlToCapture = data.source.url;
  const outputFolder = 'public';
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const viewportWidth = 1000;
  const viewportHeight = 1200;
  await page.setViewport({ width: viewportWidth, height: viewportHeight });


  // Navigate to the specified URL
  await page.goto(urlToCapture, { waitUntil: 'networkidle0' });

  await new Promise(r => setTimeout(r, 2000));
  await page.waitForSelector('body');
  // Generate a PDF
  const pdfBufferBytes = await page.pdf({ format: 'A4', printBackground: true });

  // const snapBufferBytes = await page.screenshot({
  //   path: `${outputFolder}/screenshot.png`});

  // const pdfBuffer = Buffer.from(pdfBufferBytes);
  // fs.writeFileSync('public/bittu.pdf', pdfBuffer);
  // Close the browser
  await browser.close();

  logger.info('Capture completed. Check the output folder.');  
  return new NextResponse(pdfBufferBytes)

  // return NextResponse.json({ status: 'Success', pdfBufferString: pdfBufferBytes.toString()}, { status: 200 })
}
