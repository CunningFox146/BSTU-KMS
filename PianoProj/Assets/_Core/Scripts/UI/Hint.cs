using System.Collections;
using UnityEngine;
using UnityEngine.UI;

public class Hint : MonoBehaviour
{
    [SerializeField] private Text _text;

    private Coroutine _hideCoroutine;
    private CanvasGroup _group;

    private void Awake()
    {
        _group = GetComponent<CanvasGroup>();
    }

    private void Start()
    {
        TaskManager.TaskChanged += (data) => ShowHint(data.taskName, 10f);
        ShowHint(TaskManager.Instance.Tasks[TaskManager.Instance.CurrentTaskIndex].taskName, 10f);
    }

    public void ShowHint(string text, float duration)
    {
        if (_text.text == text) return;

        _text.text = text;

        if (_hideCoroutine != null)
        {
            StopCoroutine(_hideCoroutine);
        }
        StartCoroutine(FadeCoroutine(false));
        _hideCoroutine = StartCoroutine(HideHintCoroutine(duration));
    }

    private IEnumerator HideHintCoroutine(float duration)
    {
        yield return new WaitForSeconds(duration);
        _hideCoroutine = StartCoroutine(FadeCoroutine(true));
    }

    private IEnumerator FadeCoroutine(bool isFadeOut)
    {
        float startTime = Time.time;
        float fadeDuration = 1f;
        _group.alpha = 0f;

        while (true)
        {
            float percent = Mathf.Clamp01((Time.time - startTime) / fadeDuration);
            float alpha = isFadeOut ? (1f - percent) : percent;

            _group.alpha = alpha;

            if (percent >= 1f)
            {
                yield break;
            }

            yield return null;
        }
    }
}
