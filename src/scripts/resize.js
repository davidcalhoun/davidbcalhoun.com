/**
 * Resizes all jpgs in a directory.
 * Outputs to different sizes and formats (jpeg, webp)
 *
 * Sharp docs: https://sharp.pixelplumbing.com
 */

import sharp from 'sharp';
import fs from 'fs';
import util from 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
    
const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);

const OUTPUT_SIZES = [500, 1000, 2000];
const OUTPUT_FORMAT_OPTIONS = [
    {
        format: 'jpeg',
        options: {
           quality: 80,
           progressive: true,
           optimizeScans: true
        }
    },
    {
        format: 'webp',
        options: {
           quality: 80,
           reductionEffort: 6
        }
    }
];

function getStuff() {
  return readFile('test');
}

async function processFilesInDir(dir) {
    let files;
    try {
        files = await readDir(dir);
    } catch(e) {
        console.error(e);
    }

    files.forEach(function (file) {
        const isJPEG = file.endsWith('.jpg') || file.endsWith('.jpeg');
        const isAlreadyResized = file.endsWith('-resize.jpg') || file.endsWith('-resize.jpeg');

        if (isJPEG && !isAlreadyResized) {
            const [name] = file.split('.jpg');

            OUTPUT_SIZES.forEach(size => {
                OUTPUT_FORMAT_OPTIONS.forEach(({ format, options }) => {
                    sharp(file)
                        .resize(size)
                        [format](options)
                        .toFile(`${name}-${size}px-resize.${format}`, (err, info) => {
                            if (err) {
                                console.error(`Problem processing ${file}`);
                                console.error(err);
                            }
                        });
                });
            });

        }
    });
}


processFilesInDir(__dirname);

