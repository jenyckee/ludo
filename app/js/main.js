import $ from 'jquery';
import foo from './lib';

require('bootstrap-loader');

console.log(foo());

$('body').append('<h1>It works!</h1>');
