using System.Collections;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(CanvasGroup), typeof(AudioSource))]
public class Hint : MonoBehaviour
{
    [SerializeField] private TextMeshProUGUI _body;
    [SerializeField] private TextMeshProUGUI _head;

    private Coroutine _hideCoroutine;
    private CanvasGroup _group;
    private AudioSource _audio;

    private void Awake()
    {
        _group = GetComponent<CanvasGroup>();
        _audio = GetComponent<AudioSource>();
    }

    private void Start()
    {
        TaskManager.TaskChanged += (num, data) => ShowHint(num, data.taskName, 10f);
        ShowHint(TaskManager.Instance.CurrentTaskIndex, TaskManager.Instance.Tasks[TaskManager.Instance.CurrentTaskIndex].taskName, 10f);
    }

    public void ShowHint(int num, string text, float duration)
    {
        if (_body.text == text) return;

        _audio.Play();

        _body.text = text;
        _head.text = $"Задание #{num + 1}";

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
