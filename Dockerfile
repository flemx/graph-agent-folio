########################################
# 1. Build React frontend
########################################
FROM node:20 AS frontend-build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build      # outputs to /app/dist

########################################
# 2. Build Python backend
########################################
FROM python:3.12-slim AS backend
ENV PYTHONUNBUFFERED=1
WORKDIR /srv

# ------------------------------------------------------------------
# Copy backend code and install dependencies directly via pip
# ------------------------------------------------------------------
COPY backend ./backend
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir ./backend

# ------------------------------------------------------------------
# Move into backend folder for runtime
# ------------------------------------------------------------------
WORKDIR /srv/backend


# ------------------------------------------------------------------
# Copy the built React bundle into FastAPI's static dir
# ------------------------------------------------------------------
RUN mkdir -p app/static
COPY --from=frontend-build /app/dist ./app/static

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
