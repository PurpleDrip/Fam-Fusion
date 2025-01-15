Directory structure:
└── purpledrip-fam-fusion/
    ├── index.js
    ├── package.json
    ├── Config/
    │   ├── connecttoDB.js
    │   └── connecttoRedis.js
    ├── Controller/
    │   ├── addProfileController.js
    │   ├── adoptedProfileController.js
    │   ├── forgotPasswordUser.js
    │   ├── logoutController.js
    │   ├── registerOrganController.js
    │   ├── registerUserController.js
    │   ├── resetPasswordUser.js
    │   └── updateRecordController.js
    ├── Helpers/
    │   └── joiValidators.js
    ├── Middleware/
    │   ├── addRefreshMiddleware.js
    │   ├── addTokenMiddleware.js
    │   ├── checkforToken.js
    │   ├── filteredProfileMiddleware.js
    │   ├── loginOrganMiddleware.js
    │   ├── loginUserMiddleware.js
    │   └── verifyUsing1CARD.js
    ├── Models/
    │   ├── Child.js
    │   ├── Organ.js
    │   ├── Record.js
    │   └── User.js
    ├── Routes/
    │   ├── filterRoute.js
    │   ├── loginRoute.js
    │   ├── passwordRoute.js
    │   ├── profileRoute.js
    │   ├── registerRoute.js
    │   └── webRTCRoute.js
    └── Util/
        └── sendEmail.js
