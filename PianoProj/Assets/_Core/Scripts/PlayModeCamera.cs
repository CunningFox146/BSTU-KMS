using UnityEngine;

public class PlayModeCamera : MonoBehaviour
{
    [SerializeField] private Vector2 _bounds;
    [SerializeField] private float _speed = 5f;

    private Camera _camera;

    private void Awake()
    {
        _camera = GetComponent<Camera>();
    }

    private void Start()
    {
        _bounds.x += transform.position.x;
        _bounds.y += transform.position.x;
    }

    private void Update()
    {
        var pos = Input.mousePosition;
        float pX = pos.x / Screen.width;
        float pY = pos.y / Screen.height;

        float threshold = 0.25f;
        float deltaX = pX <= threshold ? -1f : pX >= (1f - threshold) ? 1f : 0f;
        float newPos = transform.position.x + deltaX * Time.deltaTime;
        if (!Mathf.Approximately(deltaX, 0f) && newPos > _bounds.x && newPos < _bounds.y)
        {
            transform.Translate(Vector3.right * deltaX * Time.deltaTime * _speed); ;
        }
    }

    private void FixedUpdate()
    {
        // Чистый код би лайк
        if (Physics.Raycast(_camera.ScreenPointToRay(Input.mousePosition), out RaycastHit hit) &&
            hit.transform != null && hit.transform.parent != null && hit.transform.parent.parent != null)
        {
            var clickable = hit.transform.parent.parent.GetComponent<IHoverable>();
            if (clickable != null)
            {
                clickable.OnHover();
            }
        }
    }
}
