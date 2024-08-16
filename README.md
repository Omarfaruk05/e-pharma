# Project Name: [E-Pharma](https://e-pharma-frontend.vercel.app)

## E-Pharma is an e-commerce platform for medicine management. The frontend is built using Next.js, React, and Tailwind CSS, integrated with Redux for state management and RTK Query for data fetching. This site is usually used for buying medicine in online. A user cant visit this website and can get the overall idea about medicine. If a user can purchase somthing from this website then he/she has to creat an account and logged in. After logged in user can see the dashboard and other necessary document. Admin and super admin can handle all CRUD operations but admin can't see all admins where superadmin can.

### For admin:

email: nktonmoy2230@gmail.com
password: 123456

## admin action:

1. Delete any user expect admin and super_admin
2. Delete and update all products.
3. Delete and update all shippingaddress.
4. Delete and update all oreders.

## super_admin

email: omarfaruk149518@gmail.com
password:123456

## Super admin action:

1. Delete any users
2. Delete and update all products.
3. Delete and update all shippingaddress.
4. Delete and update all oreders.
5. Super admin can delete admins.

## user

email: halifax980@gmail.com
password:123456

## Follow this steps to install the project in your local computer.

#### step-1

```
git clone https://github.com/Omarfaruk05/e-pharma
```

#### step-2

```
cd e-pharma-frontend
```

#### step-3

```
yarn
```

#### step-4

```
yarn dev
```

# API Documentation

## Auth(User)

- Route: [https://e-pharma-backend.vercel.app/api/v1/auth/login](https://e-pharma-backend.vercel.app/api/v1/auth/login) (POST) login
- Route: [https://e-pharma-backend.vercel.app/api/v1/auth/refresh-token](https://e-pharma-backend.vercel.app/api/v1/auth/refresh-token) (POST) refresh token

## User

- Route: [https://e-pharma-backend.vercel.app/api/v1/users](https://e-pharma-backend.vercel.app/api/v1/users) (GET) All users
- Route: [https://e-pharma-backend.vercel.app/api/v1/users/:id](https://e-pharma-backend.vercel.app/api/v1/users/:id) (GET) Single user
- Route: [https://e-pharma-backend.vercel.app/api/v1/users/create-user](https://e-pharma-backend.vercel.app/api/v1/users/create-user) (POST) Create user
- Route: [https://e-pharma-backend.vercel.app/api/v1/users/:id](https://e-pharma-backend.vercel.app/api/v1/users/:id) (PATCH) Update user
- Route: [https://e-pharma-backend.vercel.app/api/v1/users/:id](https://e-pharma-backend.vercel.app/api/v1/users/:id) (DELETE) Delete user

## Product

- Route: [https://e-pharma-backend.vercel.app/api/v1/products](https://e-pharma-backend.vercel.app/api/v1/products) (GET) All products
- Route: [https://e-pharma-backend.vercel.app/api/v1/products/:id](https://e-pharma-backend.vercel.app/api/v1/products/:id) (GET) Single product
- Route: [https://e-pharma-backend.vercel.app/api/v1/products](https://e-pharma-backend.vercel.app/api/v1/products) (POST) Create product
- Route: [https://e-pharma-backend.vercel.app/api/v1/products/:id](https://e-pharma-backend.vercel.app/api/v1/products/:id) (PATCH) Update product
- Route: [https://e-pharma-backend.vercel.app/api/v1/products/:id](https://e-pharma-backend.vercel.app/api/v1/products/:id) (DELETE) Delete product

## Order

- Route: [https://e-pharma-backend.vercel.app/api/v1/orders](https://e-pharma-backend.vercel.app/api/v1/orders) (GET) All orders
- Route: [https://e-pharma-backend.vercel.app/api/v1/orders/:id](https://e-pharma-backend.vercel.app/api/v1/orders/:id) (GET) Single order
- Route: [https://e-pharma-backend.vercel.app/api/v1/orders](https://e-pharma-backend.vercel.app/api/v1/orders) (POST) Create order
- Route: [https://e-pharma-backend.vercel.app/api/v1/orders/:id](https://e-pharma-backend.vercel.app/api/v1/orders/:id) (PATCH) Update order
- Route: [https://e-pharma-backend.vercel.app/api/v1/orders/:id](https://e-pharma-backend.vercel.app/api/v1/orders/:id) (DELETE) Delete order

## Shipping Address

- Route: [https://e-pharma-backend.vercel.app/api/v1/shipping-addresses](https://e-pharma-backend.vercel.app/api/v1/shipping-addresses) (GET) All shipping addresses
- Route: [https://e-pharma-backend.vercel.app/api/v1/shipping-addresses/:id](https://e-pharma-backend.vercel.app/api/v1/shipping-addresses/:id) (GET) Single shipping address
- Route: [https://e-pharma-backend.vercel.app/api/v1/shipping-addresses](https://e-pharma-backend.vercel.app/api/v1/shipping-addresses) (POST) Create shipping address
- Route: [https://e-pharma-backend.vercel.app/api/v1/shipping-addresses/:id](https://e-pharma-backend.vercel.app/api/v1/shipping-addresses/:id) (PATCH) Update shipping address
- Route: [https://e-pharma-backend.vercel.app/api/v1/shipping-addresses/:id](https://e-pharma-backend.vercel.app/api/v1/shipping-addresses/:id) (DELETE) Delete shipping address

## Variant

- Route: [https://e-pharma-backend.vercel.app/api/v1/variants](https://e-pharma-backend.vercel.app/api/v1/variants) (GET) All variants
- Route: [https://e-pharma-backend.vercel.app/api/v1/variants/:id](https://e-pharma-backend.vercel.app/api/v1/variants/:id) (GET) Single variant
- Route: [https://e-pharma-backend.vercel.app/api/v1/variants](https://e-pharma-backend.vercel.app/api/v1/variants) (POST) Create variant
- Route: [https://e-pharma-backend.vercel.app/api/v1/variants/:id](https://e-pharma-backend.vercel.app/api/v1/variants/:id) (PATCH) Update variant
- Route: [https://e-pharma-backend.vercel.app/api/v1/variants/:id](https://e-pharma-backend.vercel.app/api/v1/variants/:id) (DELETE) Delete variant

## User OTP Verification

- Route: [https://e-pharma-backend.vercel.app/api/v1/otp/verifyOTP](https://e-pharma-backend.vercel.app/api/v1/otp/verifyOTP) (POST) Verify OTP
- Route: [https://e-pharma-backend.vercel.app/api/v1/otp/resendOTPVerification](https://e-pharma-backend.vercel.app/api/v1/otp/resendOTPVerification) (POST) Resend OTP Verification
