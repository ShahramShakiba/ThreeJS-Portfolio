import { existsSync, rmSync } from 'fs';
import { resolve } from 'path';

const distPath = resolve('dist');

if (existsSync(distPath)) {
    rmSync(distPath, { recursive: true, force: true });
    console.log('dist directory cleaned');
} else {
    console.log('dist directory does not exist');
}