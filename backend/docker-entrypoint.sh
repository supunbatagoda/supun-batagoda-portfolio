#!/bin/sh
set -e

echo "Applying database migrations..."
MAX_RETRIES=10
RETRY_COUNT=0

until npx prisma migrate deploy || [ $RETRY_COUNT -ge $MAX_RETRIES ]; do
  RETRY_COUNT=$((RETRY_COUNT + 1))
  echo "Database not ready yet or migration failed. Retrying ($RETRY_COUNT/$MAX_RETRIES) in 3s..."
  sleep 3
done

if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
  echo "ERROR: Failed to apply database migrations after $MAX_RETRIES attempts."
  exit 1
fi

echo "Starting backend..."
exec "$@"
