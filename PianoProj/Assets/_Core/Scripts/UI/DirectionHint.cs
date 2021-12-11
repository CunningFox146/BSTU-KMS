using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[RequireComponent(typeof(CanvasGroup))]
public class DirectionHint : MonoBehaviour
{
    private CanvasGroup _canvasGroup;

    private void Awake()
    {
        _canvasGroup = GetComponent<CanvasGroup>();

        TaskManager.TaskChanged += OnTaskChangedHandler;
    }

    private void OnTaskChangedHandler(int num, TaskData _)
    {
        if (num == 2)
        {
            TaskManager.TaskChanged -= OnTaskChangedHandler;
            Show();
        }
    }

    public void Show()
    {
        StartCoroutine(TintCoroutine());
    }

    private IEnumerator TintCoroutine()
    {
        float start = Time.time;
        float duration = 0.5f;
        while (true)
        {
            float percent = Mathf.Clamp01((Time.time - start) / duration);

            _canvasGroup.alpha = percent * 0.5f;

            if (percent >= 1f) break;
            yield return null;
        }

        yield return new WaitForSeconds(3f);

        start = Time.time;
        while (true)
        {
            float percent = Mathf.Clamp01((Time.time - start) / duration);

            _canvasGroup.alpha = (1f - percent) * 0.5f;

            if (percent >= 1f) break;
            yield return null;
        }
    }
}
