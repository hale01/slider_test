# Тестовый проект

## Версии ПО

nodejs == v14.16.0

## Установка

```
cd src/front
npm install
cd ../
./watcher
```

Затем надо запустить вебсервер и cors proxy

```
cd src/front
npm run-script cors-proxy
npm run-script local-server
```

Прокси должен быть доступен по адресу: http://localhost:8010/proxy
