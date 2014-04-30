---
title: 'PHP Tidbit: Dead simple singleton'
date: 2009-09-14
comments: true
author: David
layout: post
permalink: /2009/php-tidbit-dead-simple-singleton
categories:
  - Uncategorized
tags:
  - php
  - singleton
---
<pre name="code" class="php">class Singleton {
    private static $instance;
    public static function getInstance() {
        if(!isset(self::$instance)) {
            $c = __CLASS__;
            self::$instance = new $c();
        }
        return self::$instance;
    }
}</pre>

And the explanation&#8230;

<pre name="code" class="php">class Singleton {
    private static $instance;               // static variable to hold our 1 instance

    public static function getInstance() {  // function to get the 1 instance
        if(!isset(self::$instance)) {       // this will only run once (and instantiate once)
            $c = __CLASS__;                 // get the class (Singleton)
            self::$instance = new $c();     // instantiate the class and store it in our variable
        }
        return self::$instance;             // return the instance
    }

    public static function myFunction() {   // we can get to this through Singleton::getInstance()->myFunction()
        // ...
    }
}</pre>