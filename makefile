deploy:
	docker build -t nest-blog-api . && docker run -d -p 8004:8004 --name nest-blog-api nest-blog-api