# Task Manager - DevOps Setup

## 📁 Project Structure

```
Task-Manager/
├── frontend/
│   ├── Dockerfile
│   └── nginx.conf
├── backend/
│   └── Dockerfile
├── k8s/
│   ├── namespace.yml
│   ├── mongo-secret.yml
│   ├── mongo-configmap.yml
│   ├── mongo-statefulset.yml
│   ├── mongo-service.yml
│   ├── backend-configmap.yml
│   ├── backend-secret.yml
│   ├── backend-deployment.yml
│   ├── backend-service.yml
│   ├── frontend-deployment.yml
│   ├── frontend-service.yml
│   └── ingress.yml
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── docker-compose.yml
├── mongo-init.js
└── .env.example
```

---

## 🐳 Docker & Docker Compose

### Build and run locally:
```bash
cp .env.example .env
docker-compose up --build
```

Access the app at: http://localhost:3000

---

## ⚙️ GitHub Actions CI/CD

### Required GitHub Secrets:
Go to your repo → Settings → Secrets and variables → Actions → New repository secret

| Secret Name | Value |
|---|---|
| `DOCKERHUB_USERNAME` | Your DockerHub username |
| `DOCKERHUB_TOKEN` | DockerHub access token |
| `KUBECONFIG` | `cat ~/.kube/config \| base64` output |

### Pipeline steps:
1. **Test** – runs on every push/PR
2. **Build & Push** – builds Docker images and pushes to DockerHub (only on `main`)
3. **Deploy** – applies Kubernetes manifests (only on `main`)

---

## ☸️ Kubernetes

### Prerequisites:
```bash
# Install minikube (local cluster)
minikube start
minikube addons enable ingress

# Add to /etc/hosts (Linux/Mac):
echo "$(minikube ip) taskmanager.local" | sudo tee -a /etc/hosts
```

### Deploy manually:
```bash
kubectl apply -f k8s/namespace.yml
kubectl apply -f k8s/mongo-secret.yml
kubectl apply -f k8s/mongo-configmap.yml
kubectl apply -f k8s/mongo-statefulset.yml
kubectl apply -f k8s/mongo-service.yml
kubectl apply -f k8s/backend-configmap.yml
kubectl apply -f k8s/backend-secret.yml
kubectl apply -f k8s/backend-deployment.yml
kubectl apply -f k8s/backend-service.yml
kubectl apply -f k8s/frontend-deployment.yml
kubectl apply -f k8s/frontend-service.yml
kubectl apply -f k8s/ingress.yml
```

### Verify everything works:
```bash
kubectl get all -n taskmanager
kubectl get ingress -n taskmanager
```

Access the app at: http://taskmanager.local
