# Project "Stellar Burger"

[Project link](https://j-aroq.github.io/react-burger/)
-------------------------

**STACK**

JavaScript, CSS, JSX, React, Redux, React Router, WebSocket, TypeScript.

**DESCRIPTION**

A desktop application for creating a burger from various available ingredients and placing an order for it. The burger is assembled by dragging the ingredients from the left side of the screen to the right side using the “drag and drop” method. If necessary, it is possible to remove toppings and sauces from the burger and change the order in which they are placed.

When clicking on an ingredient card, the user can see the details of a particular ingredient. 

Only registered users can place orders. In the personal account, the user sees their own orders and can edit their profile

There is an “Order Feed («Лента заказов»)” for all users and orders of a specific user in his personal cabinet, created via WebSocket. The “Order Feed” is loaded with the 50 most recent orders of the burger shop, and on the right side of the screen the order statuses are displayed in real time. When you click on an order, you can also see its details in a popup, and when you refresh the page - on a separate page.

**PROJECT LAUNCH**

```sh
npm start
```

**ОПИСАНИЕ**

Десктопное приложение для создания бургеров из различных доступных ингредиентов и размещения заказа на него. Сборка бургера осуществляется путем перетаскивания ингредиентов с левой части экрана в правую методом "drag and drop". При необходимости есть возможность удаления начинок и соусов из бургера и изменение порядка их размещения.

При клике на карточку с ингредиентом пользователь видит детали конкретного ингредиента. 

Размещать заказы могут только зарегистрированные пользователи. В личном кабинете пользователь видит свои собственные заказы и может редактировать свой профиль

Есть «Лента заказов» для всех пользователей и заказов конкретного пользователя в его личном кабинете, созданная посредством WebSocket. В «Ленту заказов» подгружается 50 последних заказов бургерной, а справа на экране в режиме реального времени отражаются статусы заказов. При клике на заказ также можно посмотреть его детали в попапе, при обновлении страницы – на отдельной странице.

**ЗАПУСК ПРОЕКТА**

```sh
npm start
```
