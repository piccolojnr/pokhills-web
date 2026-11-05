import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { businesses, statusLabel, statusMessage, enquiryLink, enquiryLabel } from '../src/data/businesses.ts';

const routes = ['/', '/restaurant', '/menu', '/gallery', '/rooms', '/contact', '/about', '/reserve', '/book-a-table'];
const htmlFor = route => readFileSync(resolve('dist', route === '/' ? 'index.html' : `${route.slice(1)}/index.html`), 'utf8');

test('opening status changes stay independent and never enable accommodation booking', () => {
  assert.equal(businesses.pokrom.status, 'coming_soon');
  assert.equal(businesses.pokhills.status, 'coming_soon');
  try {
    for (const status of ['coming_soon', 'open', 'temporarily_closed']) {
      businesses.pokrom.status = status;
      assert.equal(statusLabel('pokrom'), { coming_soon: 'Opening Soon', open: 'Now Open', temporarily_closed: 'Temporarily Closed' }[status]);
      assert.equal(statusLabel('pokhills'), 'Coming Soon');
      assert.equal(enquiryLabel('pokrom'), { coming_soon: 'Ask about the opening', open: 'Plan your visit', temporarily_closed: 'Ask for reopening updates' }[status]);
      assert.match(statusMessage('pokhills'), /not available/);
    }
    businesses.pokhills.status = 'open';
    assert.match(statusMessage('pokhills'), /Online bookings are not available/);
    assert.match(decodeURIComponent(enquiryLink('pokrom')), /Pokrom Eco Bar/);
    assert.match(decodeURIComponent(enquiryLink('pokhills')), /Pokhills Eco Garden/);
  } finally {
    businesses.pokrom.status = 'coming_soon';
    businesses.pokhills.status = 'coming_soon';
  }
});

test('all retained public routes build with SEO, navigation and valid local assets', () => {
  for (const route of routes) {
    const html = htmlFor(route);
    assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, route);
    assert.ok(html.includes('aria-label="Primary navigation"'), route);
    assert.ok(html.includes('aria-current="page"') || ['/reserve', '/book-a-table', '/about'].includes(route), route);
    assert.match(html, /rel="canonical" href="https:\/\/pokhillsecogarden.com\//, route);
    assert.match(html, /property="og:image" content="https:\/\/pokhillsecogarden.com\/brand\/pokrom-social.png"/, route);
    assert.doesNotMatch(html, /Pokrom Garden Bar|Pokhills Eco Gardens|50% deposit|Sample menu/, route);
    for (const [, attribute, value] of html.matchAll(/\b(src|href)="(\/[^"#?]*)[^\"]*"/g)) {
      if (value.startsWith('//')) continue;
      const target = resolve('dist', value.slice(1));
      assert.ok(existsSync(target) || existsSync(resolve(target, 'index.html')), `${route}: missing ${attribute} ${value}`);
    }
    const schema = JSON.parse(html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)[1]);
    assert.equal(schema['@graph'].filter(entity => entity['@type'] === 'BarOrPub').length, 1);
    assert.ok(!JSON.stringify(schema).includes('openingHours'));
    assert.ok(!JSON.stringify(schema).includes('Offer'));
  }
});

test('launch defaults show honest menu and stays states without transaction or mock enquiry forms', () => {
  assert.match(htmlFor('/'), /Welcome to/);
  assert.match(htmlFor('/'), /Opening Soon/);
  assert.match(htmlFor('/menu'), /Menu Coming Soon/);
  for (const route of ['/rooms', '/reserve']) {
    const html = htmlFor(route);
    assert.match(html, /Coming Soon/);
    assert.match(html, /bookings and payments are not available/i);
    assert.doesNotMatch(html, /\/ night|GHS\s*\d|type="submit"|checkout/i);
  }
  assert.doesNotMatch(htmlFor('/contact'), /<form/);
  assert.match(htmlFor('/gallery'), /illustrations below are placeholders/);
  assert.ok(existsSync('dist/brand/pokrom-social.png'));
  const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
  for (const route of routes.filter(route => !['/reserve', '/book-a-table'].includes(route))) {
    assert.ok(sitemap.includes(`https://pokhillsecogarden.com${route}</loc>`), route);
  }
});
