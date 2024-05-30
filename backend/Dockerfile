FROM php:8.2-apache
WORKDIR /var/www/html

#instalando o pdo_pgsql
RUN apt update \
    && apt install -y libpq-dev git unzip \
    && docker-php-ext-install pdo 

#instal o composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
 docker-php-ext-install pdo_mysql