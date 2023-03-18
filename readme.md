# Запуск сервера
## Websocket версия
+ Клонируем директорию https://github.com/d99b09/d99b09.github.io.git

```git clone https://github.com/d99b09/d99b09.github.io.git```

+ Устанавливаем requirements

```pip install -r requirements.txt```

+ Переходим в директорию backend

```cd backend```

+ Запускаем файл main.py

```python main.py```

+ В отдельном окне запускаем main_http.py

```python main_http.py```

+ Переходим по ссылке https://sheeptester.github.io/scratch-gui/?url=https://d99b09.github.io/js/mioband_scratch.js

После перехода по ссылке и загрузке страницы в первом терминале должны отображаться состояния браслета  
Во втором - открыться порт http://127.0.0.1:5000
Если всё прошло успешно можно программировать 

## Full http версия

+ Клонируем директорию https://github.com/d99b09/d99b09.github.io.git

```git clone https://github.com/d99b09/d99b09.github.io.git```

+ Устанавливаем requirements

```pip install -r requirements.txt```

+ Переходим в директорию backend

```cd backend```

+ Запускаем файл http_server.py

```python http_server.py```

+ Переходим по ссылке 
https://sheeptester.github.io/scratch-gui/?url=https://d99b09.github.io/js/mioband_scratch_final.js

После перехода по ссылке и загрузке страницы в первом терминале должны отображаться состояния браслета  
Во втором - открыться порт http://127.0.0.1:5000
Если всё прошло успешно можно программировать 

## Desktop версия
### Запуск сервера 

+ Клонируем директорию https://github.com/d99b09/d99b09.github.io.git

```git clone https://github.com/d99b09/d99b09.github.io.git```

+ Устанавливаем requirements

```pip install -r requirements.txt```

+ Переходим в директорию backend

```cd backend```

+ Запускаем файл http_server.py

```python http_server_for_desktop.py```

###Запуск desktop приложения

+ Убедитесь что установлен Node.js

+ В отдельную папку клонируем https://gittch-desktop> hub.com/LLK/scratch-desktop.git 

```git clone https://gittch-desktop> hub.com/LLK/scratch-desktop.git ```

+ Переходим в неё

```cd scratch-desktop```

+ Устанавливаем 

```npm install```

+ Копируем папки из miobracelet-patch в node_modules 


