package com.kanban.backend.service;

import com.kanban.backend.model.Task;
import com.kanban.backend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(String title, String description) {
        Task task = new Task();
        task.setTitle(title);
        task.setDescription(description);
        task.setStatus("TO_DO");
        task.setTaskNo("KANBAN-" + (taskRepository.count() + 1));
        return taskRepository.save(task);
    }

    public Task updateStatus(Long id, String status) {
        Optional<Task> existingTask = taskRepository.findById(id);
        if (existingTask.isEmpty()) {
            throw new RuntimeException("Task not found");
        }

        Task task = existingTask.get();
        task.setStatus(status);
        return taskRepository.save(task);
    }
}
