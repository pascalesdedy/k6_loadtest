import { Rate, Counter, Trend } from 'k6/metrics';

/* Custom Metrics */
export let http_not_200 = new Counter('http_not_200');
export let http_not_201 = new Counter('http_not_201');
export let http_duration = new Trend('http_duration')
export let iterationSuccess = new Counter('iterations_success');
export let iterationFailed = new Counter('iterations_failed');
export let errorRate = new Rate('error_rate')