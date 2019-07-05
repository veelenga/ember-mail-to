import Ember from 'ember';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function getLink(element) {
  return element.getElementsByTagName('a')[0].href;
}

module('Integration | Component | mail-to', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders mail-to link with a tag element', async function(assert) {
    await render(hbs`
      {{#mail-to to='to@gmail.com'}} Click me! {{/mail-to}}
    `);

    assert.equal(this.element.childElementCount, 1);
    assert.equal(this.element.children[0].tagName, "A");
  });

  test('it renders mail-to link with TO', async function(assert) {
    await render(hbs`
      {{#mail-to to='to@gmail.com'}} Click me! {{/mail-to}}
    `);

    assert.equal(this.element.textContent.trim(), 'Click me!');
    assert.equal(getLink(this.element), 'mailto:to@gmail.com');
  });

  test('it renders mail-to link with CC', async function(assert) {
    await render(hbs`
      {{#mail-to to='to@gmail.com' cc=(array 'cc1@gmail.com' 'cc2@gmail.com')}}
        Click me!
      {{/mail-to}}
    `);

    assert.equal(this.element.textContent.trim(), 'Click me!');
    assert.equal(getLink(this.element), 'mailto:to@gmail.com?cc=cc1@gmail.com,cc2@gmail.com');
  });

  test('it renders mail-to link with BCC', async function(assert) {
    await render(hbs`
      {{#mail-to to='to@gmail.com' bcc=(array 'bcc1@gmail.com' 'bcc2@gmail.com')}}
        Click me!
      {{/mail-to}}
    `);

    assert.equal(this.element.textContent.trim(), 'Click me!');
    assert.equal(getLink(this.element), 'mailto:to@gmail.com?bcc=bcc1@gmail.com,bcc2@gmail.com');
  });

  test('it renders mail-to link with Subject', async function(assert) {
    await render(hbs`
      {{#mail-to to='to@gmail.com' subject='Email Subject'}} Click me! {{/mail-to}}
    `);

    assert.equal(this.element.textContent.trim(), 'Click me!');
    assert.equal(getLink(this.element), 'mailto:to@gmail.com?subject=Email%20Subject');
  });

  test('it renders mail-to link with Body', async function(assert) {
    await render(hbs`
      {{#mail-to to='to@gmail.com' body='Email Body'}} Click me! {{/mail-to}}
    `);

    assert.equal(this.element.textContent.trim(), 'Click me!');
    assert.equal(getLink(this.element), 'mailto:to@gmail.com?body=Email%20Body');
  });

  test('it requires TO', async function(assert) {
    Ember.onerror = function(error) {
      assert.equal(
        error.message,
        'Assertion Failed: You must provide `to` parameter to the `{{mail-to}}` component.'
      );
    };
    await render(hbs`
      {{#mail-to body='Email Body'}}Click me!{{/mail-to}}
    `);
  });

  test('it requires prefix', async function(assert) {
    Ember.onerror = function(error) {
      assert.equal(
        error.message,
        'Assertion Failed: You must provide `prefix` parameter to the `{{mail-to}}` component.'
      );
    };
    await render(hbs`
      {{#mail-to prefix=null to='to@gmail.com'}}Click me!{{/mail-to}}
    `);
  });
});
