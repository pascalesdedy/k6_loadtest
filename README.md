[![CircleCI](https://circleci.com/gh/pascalesdedy/k6_loadtest/tree/circleci-project-setup.svg?style=shield)](https://circleci.com/gh/pascalesdedy/k6_loadtest/tree/circleci-project-setup)

# Load testing using k6

running the test:  `k6 run test.js -c ./config.json` 

Endpoints :
 - /GET users : get all users  
 - /POST posts: create a post

 #### Directory structure
```
├── config.json
├── data
│   └── request.js
├── helpers
│   ├── custom_metrics.js
│   └── global_variable.js
├── LICENSE
├── README.md
└── test.js
```

Report: ```summary.html```