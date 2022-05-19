import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.2.0/dist/bundle.js";
import { check, group } from 'k6';
import { http_not_200, http_not_201, http_duration, errorRate, iterationSuccess, iterationFailed } from './helpers/custom_metrics.js'
import { url_api, path } from './helpers/global_variable.js'
import { paramsCreatePost, payload } from './data/request.js'

// k6-reporter
export function handleSummary(data) {
	return {
	  "summary.html": htmlReport(data),
	};
  }

/* Test case */
export function getUsers() {
	group('Loadtest - method GET Users', function(){
		//header
		const paramsGetUsers = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const hitGetUsers = http.get(url_api + path.users, paramsGetUsers);
		http_duration.add(hitGetUsers.timings.duration);

		//validate response-body
		let checkGetUsers = check(hitGetUsers, {
			'GET /users - Get all users': (r) => r.body.indexOf('address') !== -1 && hitGetUsers.status == 200

		});
		if (!checkGetUsers) {
			if (checkGetUsers.status != 200) {
				http_not_200.add(1);
				console.error(path.users + ' | HTTP Response: ' + hitGetUsers.status);
			}
			errorRate.add(true);
            iterationFailed.add(1);
			console.error(path.users + ' | ' +  hitGetUsers.body);
		} else {
            iterationSuccess.add(1);
			errorRate.add(false);
		}
	});  
}

export function createPost() {
    group('Loadtest - method POST Posts', function(){
		const hitCreatePosts = http.post(url_api + path.posts, payload, paramsCreatePost);
		http_duration.add(hitCreatePosts.timings.duration);
        //parse response
        let parsedResponse;
        try {
			parsedResponse = JSON.parse(hitCreatePosts.body);
		} catch (e) {
			if (parsedResponse == undefined) parsedResponse = { page: '' };
			console.error('/post | Response is not a JSON');
			console.error(JSON.stringify(hitCreatePosts.body));
		}
        //validate response body
		let checkCreatePosts = check(hitCreatePosts, {
			'POST /posts - create a post ':  (r) => r.body.indexOf('title') !== -1 &&hitCreatePosts.status == 201

		});
		if (!checkCreatePosts) {
			if (checkCreatePosts.status != 201) {
				http_not_201.add(1);
				console.error(path.posts + ' | HTTP Response: ' + hitCreatePosts.status);
			}
			errorRate.add(true);
            iterationFailed.add(1);
			console.error(path.posts + ' | ' +  hitCreatePosts.body);
		} else {
            iterationSuccess.add(1);
			errorRate.add(false);
		}
    });
}
