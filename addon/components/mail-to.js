import Component from '@ember/component';
import layout from '../templates/components/mail-to';
import { assert } from '@ember/debug';
import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';

function prepareQueryParams(params) {
  return Object.keys(params).reduce((acc, key) => {
    let value = params[key];
    return isPresent(value) ? acc.concat(`${key}=${value}`) : acc;
  }, []).join('&');
}

export default Component.extend({
  layout,

  prefix: Object.freeze('mailto'),

  tagName: 'a',
  attributeBindings: ['href'],

  to: null,
  cc: null,
  bcc: null,
  subject: null,
  body: null,

  href: computed(
    'prefix',
    'to',
    'cc',
    'bcc',
    'subject',
    'body',
    function() {
      let { prefix, to } = this;

      assert(
        'You must provide `prefix` parameter to the `{{mail-to}}` component.',
        isPresent(prefix)
      );
      assert(
        'You must provide `to` parameter to the `{{mail-to}}` component.',
        isPresent(to)
      );

      let link = `${prefix}:${to}`;
      let queryParams = prepareQueryParams(this.getProperties('cc', 'bcc', 'subject', 'body'));
      let uri = isPresent(queryParams) ? `${link}?${queryParams}` : link;

      return encodeURI(uri);
    }
  )
});
