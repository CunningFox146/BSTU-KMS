using System;
using System.Collections.Generic;
using UnityEngine;

public class TaskManager : MonoBehaviour
{
    public static event Action<TaskData> TaskChanged;

    public static TaskManager Instance { get; private set; }

    [SerializeField] private List<TaskData> _tasks;

    private int _currentTaskIndex = 0;

    public int CurrentTaskIndex { get => _currentTaskIndex; private set => _currentTaskIndex = value; }
    public List<TaskData> Tasks { get => _tasks; private set => _tasks = value; }

    private void Awake()
    {
        Instance = this;
    }

    public void SetTaskComplete(int idx)
    {
        if (CurrentTaskIndex < idx) return;
        ++idx;
        if (idx < Tasks.Count)
        {
            _currentTaskIndex = idx;
            TaskChanged?.Invoke(Tasks[idx]);
        }
    }
}