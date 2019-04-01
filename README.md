ember-mail-to
==============================================================================

![travis](https://travis-ci.org/veelenga/ember-mail-to.svg?branch=master)
![npm](https://img.shields.io/npm/v/ember-mail-to.svg?color=blue)

Ember component to create [HTML mailto links](https://tools.ietf.org/html/rfc6068).

Installation
------------------------------------------------------------------------------

```
ember install ember-mail-to
```


Usage
------------------------------------------------------------------------------

```hbs
<MailTo
  @to='to@gmail.com'
  @cc={{array 'cc1@gmail.com' 'cc2@gmail.com'}}
  @bcc='bcc@gmail.com'
  @subject='Email Subject'
  @body='Email Body'
>
  Click here to send an email
</MailTo>
```

Creates the following element:

```html
<a href="mailto:to@gmail.com?cc=cc1@gmail.com,cc2@gmail.com&amp;bcc=bcc@gmail.com&amp;subject=Email%20Subject&amp;body=Email%20Body">
  Click here to send an email
</a>
```


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
