package com.kanban.backend.service;

import com.kanban.backend.model.Task;
import com.kanban.backend.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Import(TaskService.class)
class TaskServiceTest {

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskRepository taskRepository;

    @Test
    void createTaskShouldPersistTaskWithToDoStatus() {
        Task created = taskService.createTask("Test title", "Test description");

        assertThat(created.getId()).isNotNull();
        assertThat(created.getStatus()).isEqualTo("TO_DO");
        assertThat(created.getTaskNo()).startsWith("KANBAN-");
        assertThat(taskRepository.findById(created.getId())).isPresent();
    }
}
