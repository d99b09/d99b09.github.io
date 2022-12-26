# Запуск сервера
## Стабильная версия
+ Клонируем директорию https://github.com/d99b09/d99b09.github.io.git

```git clone https://github.com/d99b09/d99b09.github.io.git```

+ Устанавливаем requirements

```pip install -r requirements.txt```

+ Переходим в дерикторию backend

```cd backend```

+ Запускаем файл main.py

```python main.py```

+ В отдельном окне запускаем main_http.py

```python main_http.py```

+ Переходим по ссылке https://sheeptester.github.io/scratch-gui/?url=https://d99b09.github.io/js/mioband_scratch.js

После перехода по ссылке и загрузке странцы в первом терминале должны отображаться состояния браслета  
Во втором - открыться порт http://127.0.0.1:5000
Если всё прошло успешно можно програмировать 

## Нестабильная версия

main - mioband_scratch_test4.js
http_server_test.py