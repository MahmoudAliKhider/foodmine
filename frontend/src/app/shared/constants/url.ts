const  BASE_URL='http://localhost:5000';


export  const FOOD_URL =BASE_URL +'/api/foods';
export  const FOOD_TAGS_URL =FOOD_URL +'/tags';
export  const FOOD_BY_SEARCH_URL =FOOD_URL +'/search/';
export  const FOOD_BY_TAG_URL =FOOD_URL +'/tag/';
export  const FOOD_BY_ID_URL =FOOD_URL +'/';


export  const USER_LOGIN_URL =BASE_URL +'/api/users/login';
export  const USER_REGISTER_URL =BASE_URL +'/api/users/register';

export  const ORDER_URL =BASE_URL +'/api/orders';
export  const ORDER_CREATE_URL =ORDER_URL +'/create';
export  const ORDER_NEW_FOR_CURRENT_USER_URL =ORDER_URL +'/newOrderForCurrentUser';






