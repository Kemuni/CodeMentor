# КодМентор (CodeMentor)

### Требования
- Python >= 3.12
- uv >= 0.9.21
- PostgreSQL 16
- npm >= 11.4.2
- node >= 24.4.1


## Запуск backend-части
1. Перейти в директорию `backend`
    ```shell
    cd backend
    ```
2. Создать файл `.env` в корневой директории проекта на основе `.env.example`
    ```shell
    uv venv 
    ```
3. Установить зависимости
    ```shell
    uv sync
    ```
4. Запуск проекта
    ```shell
    uv run -m app.main
    ```

