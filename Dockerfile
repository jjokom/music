FROM    nginx
COPY default.conf /etc/nginx/conf.d/default.conf
# Bundle app source
COPY . /usr/share/nginx/html


