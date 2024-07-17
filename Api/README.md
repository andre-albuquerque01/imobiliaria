# Work out in laravel

## Como Iniciar o Sistema

### Passo 1: Configuração do Back-end

Entre na pasta back-end:

```bash
cd /Imobiliaria/Api
```

Inicialize os pacotes do Laravel:

```php
composer install
```

Crie um arquivo `.env` na raiz do seu projeto e configure as variáveis de ambiente conforme necessário.
Execute `php artisan config:cache` para aplicar as configurações do arquivo `.env`.

Inicie o servidor da API:

```bash
./vendor/bin/sail up -d
```

No Linux:

```bash
sudo ./vendor/bin/sail up
```

Para desativar o servidor da API:

```bash
./vendor/bin/sail down
```

No Linux:

```bash
sudo ./vendor/bin/sail down
```

### Passo 2: Acesso ao Sistema

Abra o navegador e acesse `http://localhost/api` para utilizar o serviço.
