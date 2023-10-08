import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.metrics import f1_score, accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from torch.utils.data import DataLoader, TensorDataset
import matplotlib.pyplot as plt
import os
import joblib

# Load data
file_path = "/Users/nguyenv/SASE/sase-hackathon-random-forest/sase-hackathon/ML/text-detection/train_data.csv"
df = pd.read_csv(file_path)
df = df.sample(frac=1, random_state=42)  # Shuffle data

# Use GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using {device}")

# Convert them into PyTorch tensors
vectorizer = TfidfVectorizer(max_features=512)  # Limiting to 512 features for simplicity
X = vectorizer.fit_transform(df['tweet']).toarray()
y = pd.get_dummies(df['text_label']).values

# Convert data into PyTorch tensors
X = torch.tensor(X, dtype=torch.float32)
y = torch.tensor(y, dtype=torch.float32)

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create DataLoaders for training and testing data
train_data = TensorDataset(X_train, y_train)
test_data = TensorDataset(X_test, y_test)
train_loader = DataLoader(dataset=train_data, batch_size=16, shuffle=True)
test_loader = DataLoader(dataset=test_data, batch_size=16, shuffle=False)

# Define the CNN model
class MeanWordsClassifierCNN(nn.Module):
    def __init__(self, input_dim):
        super(MeanWordsClassifierCNN, self).__init__()
        self.conv1 = nn.Conv1d(1, 128, kernel_size=3, padding=1)  
        self.pool = nn.MaxPool1d(kernel_size=2)
        self.fc1 = nn.Linear(32768, 2)  
        self.dropout = nn.Dropout(0.5)
        
    def forward(self, x):
        x = x.unsqueeze(1)  
        x = torch.relu(self.conv1(x))
        x = self.pool(x)
        x = x.view(x.size(0), -1)  
        x = self.dropout(x)
        x = torch.softmax(self.fc1(x), dim=1)
        return x

# Instantiate the model, define loss function and optimizer


model = MeanWordsClassifierCNN(input_dim=512).to(device)

model_save_path = "/Users/nguyenv/SASE/sase-hackathon-random-forest/sase-hackathon/ML/Models/model.pth"
if os.path.exists(model_save_path):
    model.load_state_dict(torch.load(model_save_path))
    model.eval()
    print("Model loaded successfully")
else:
    print("No model found, initializing a new model.")

criterion = nn.BCELoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Training loop
num_epochs = 30
train_losses = []
val_losses = []

for epoch in range(num_epochs):
    model.train()
    train_loss = 0.0
    
    for inputs, labels in train_loader:
        inputs, labels = inputs.to(device), labels.to(device)
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        train_loss += loss.item()
        
    # Validation loss
    model.eval()
    val_loss = 0.0
    with torch.no_grad():
        for inputs, labels in test_loader:
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            val_loss += loss.item()
    
    # Log losses
    train_losses.append(train_loss/len(train_loader))
    val_losses.append(val_loss/len(test_loader))
    
    print(f"Epoch {epoch+1}/{num_epochs} => "
          f"Train loss: {train_loss:.4f}, "
          f"Validation loss: {val_loss:.4f}")

# Plotting training and validation loss
plt.plot(train_losses, label='Train Loss')
plt.plot(val_losses, label='Validation Loss')
plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.legend()
plt.show()

# Model Evaluation
model.eval()
all_preds = []
all_labels = []

with torch.no_grad():
    for inputs, labels in test_loader:
        outputs = model(inputs)
        _, preds = torch.max(outputs, 1)
        _, labels = torch.max(labels, 1)  
        
        all_preds.append(preds.numpy())
        all_labels.append(labels.numpy())

all_preds = [item for sublist in all_preds for item in sublist]
all_labels = [item for sublist in all_labels for item in sublist]

accuracy = accuracy_score(all_labels, all_preds)
f1 = f1_score(all_labels, all_preds, average='weighted')  

print(f"Accuracy: {accuracy:.4f}, F1 Score: {f1:.4f}")

# Save the model
torch.save(model.state_dict(), model_save_path)

# Save the vectorizer

vectorizer_save_path = "/Users/nguyenv/SASE/sase-hackathon-random-forest/sase-hackathon/ML/Models/vectorizer.joblib"
joblib.dump(vectorizer, vectorizer_save_path)

print(f"Model saved to {model_save_path}")
print(f"Vectorizer saved to {vectorizer_save_path}")

# Load the model (if needed later)
loaded_model = MeanWordsClassifierCNN(input_dim=512).to(device)
loaded_model.load_state_dict(torch.load(model_save_path))
loaded_model.eval()

# Load the vectorizer
loaded_vectorizer = joblib.load(vectorizer_save_path)

print("Model and Vectorizer loaded successfully")
