---
title: Native apps with Redux and React Native (WIP)
date: 11/28/2016
description: A deep dive into building native apps for Android and iOS with Facebook's React Native and managing state with Redux.
draft: true
---

Over the past few weeks, I have been independently working on a project commissioned by [1mg](https://1mg.com) - India's largest health platform.

#### Challenges

* 1mg has 4 different products for which it is building experiences on 3 different platforms, namely: Android, iOS and the web.
* This means duplication of business logic across 3 codebases, which is not the best thing to do if you go by [DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself).
* It also means introducing new features or modifying existing features requires making the necessary changes across 3 separate codebases. This is not scalable at all and the platforms would soon end up being out of sync.
* Finally, 1mg would have to build and strategically expand 3 separate teams of developers for each of the 3 platforms.


#### Objectives

To overcome these challenges, the management decided to place it's bets on the newly emerging breed of cross-platform native apps built with modern frontend stack in JavaScript. I began implementing the apps with the following main objectives:

* Although the apps would be written in JavaScript, they should not compromise on the experience and responsiveness that users have come to associate with 'native' apps. In simpler words, if you're the user, the app should feel just like any other native app on the App Store or Play Store.
* The app should reuse as much code as possible across Android and iOS. This would be in line with the principle of DRY. It would also imply that maintaining the code is far more easier and adding/modifying/removing features means touching the minimum number of files possible.
* Last but not least, the stack used should be familiar to 1mg's large team of product engineers for the web and the dependence on platform specific native developers should be reduced. This is also in line with increasing the ['bus factor'](https://en.wikipedia.org/wiki/Bus_factor) at 1mg.

Since I was the only developer working on this project :grimacing:, I had the unique opportunity to choose my own stack.

[Work in Progress]
