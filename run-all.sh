#!/bin/bash

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

PIDS=()

cleanup() {
    echo ""
    echo -e "${YELLOW}Stopping all services...${NC}"
    for pid in "${PIDS[@]}"; do
        kill "$pid" 2>/dev/null
    done
    wait 2>/dev/null
    echo -e "${GREEN}All services stopped.${NC}"
    exit 0
}

trap cleanup SIGINT SIGTERM

check_deps() {
    if ! command -v java &>/dev/null; then
        echo -e "${YELLOW}Warning: java not found in PATH${NC}"
    fi
    if ! command -v node &>/dev/null; then
        echo -e "${YELLOW}Warning: node not found in PATH${NC}"
    fi
    if ! command -v mvn &>/dev/null; [ ! -f "$ROOT_DIR/backend/mvnw" ]; then
        echo -e "${YELLOW}Warning: mvn not found in PATH and mvnw not found${NC}"
    fi
}

echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}  Kantin Kita - Starting All Services   ${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""

check_deps

(cd "$ROOT_DIR/backend" && ./mvnw spring-boot:run) 2>&1 | while IFS= read -r line; do
    echo -e "${GREEN}[backend]${NC} $line"
done &
PIDS+=("$!")

(cd "$ROOT_DIR/frontend" && npm run dev) 2>&1 | while IFS= read -r line; do
    echo -e "${BLUE}[frontend]${NC} $line"
done &
PIDS+=("$!")

(cd "$ROOT_DIR/frontend-admin" && mvn exec:java) 2>&1 | while IFS= read -r line; do
    echo -e "${MAGENTA}[frontend-admin]${NC} $line"
done &
PIDS+=("$!")

(cd "$ROOT_DIR/frontend-kantin" && mvn exec:java) 2>&1 | while IFS= read -r line; do
    echo -e "${YELLOW}[frontend-kantin]${NC} $line"
done &
PIDS+=("$!")

echo -e "${GREEN}All services started. Press Ctrl+C to stop all.${NC}"
echo ""
echo -e "  ${GREEN}[backend]${NC}        http://localhost:8080"
echo -e "  ${BLUE}[frontend]${NC}        http://localhost:3000"
echo ""

wait
