deploy:
	docker build -t nest-blog-api . &&
	docker run -d -p 3000:3000 --name nest-blog-api nest-blog-api