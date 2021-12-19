using UnityEngine;

public class ObjectClicker : MonoBehaviour
{
    private void Update()
    {
#if !UNITY_EDITOR
        HandleClickMobile();
#else
        HandlerCkickStandalone();
#endif
    }

    private void HandlerCkickStandalone()
    {
        if (!Input.GetMouseButtonDown(0)) return;

        var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        if (Physics.Raycast(ray, out RaycastHit hit) && hit.transform.TryGetComponent(out IInteractable clickable))
        {
            Debug.Log(((MonoBehaviour)clickable).name);
            clickable.OnClick();
        }
        Debug.DrawRay(ray.origin, ray.direction * 100f, Color.red, 0.5f);
    }

    private static void HandleClickMobile()
    {
        if (Input.touchCount <= 0) return;

        var touch = Input.GetTouch(0);
        var ray = Camera.main.ScreenPointToRay(touch.position);
        if (Physics.Raycast(ray, out RaycastHit hit) && hit.transform.TryGetComponent(out IInteractable clickable))
        {
            clickable.OnClick();
        }
    }
}