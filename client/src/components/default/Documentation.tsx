import * as React from "react";
import "./Documentation.css";

class Documentation extends React.Component {
    render () {
        return (
            <div className="doc">
                <h1 id="workflow-simulator">Workflow Simulator</h1>
                <p>A clould service and a npm module is to monitor the state changes of chained task in real-time. It also provides
                    an interface to connect with the cloud service which can be accessed through <a href="http://workflow-simulator.herokuapp.com/">http://workflow-simulator.herokuapp.com/</a>.</p>
                <blockquote>
                    An account created on our cloud service will be required to perform the following tasks.
                </blockquote>
                {/* Installing */}
                <h2 id="installing">Installing</h2>
                <p>WorkflowSimulator runs on Node.js and is available as an NPM package. You can install WorkflowSimulator in your project’s
                    directory as usual:</p>
                <pre>
                    <code>npm install --save workflow-simulator</code>
                </pre>
                {/* Usage */}
                <h2 id="usage">Usage</h2>
                {/* Initializing */}
                <h3 id="initializing-the-connection">Initializing the connection</h3>
                <p>First, you need to initialize an object of WSClient in order to establish a connection with the cloud service. You
                    should have permission to initialize the connection.</p>
                <pre className=" language-js">
                    <code className="prism  language-js">
                        <span className="token keyword">const</span> <span className="token punctuation">{"{"}</span> WSClient <span className="token punctuation">{"}"}</span> <span className="token operator">=</span> <span className="token function">require</span><span className="token punctuation">(</span><span className="token string">"workflow-simulator"</span><span className="token punctuation">)</span><span className="token punctuation">;</span>
                        {"\n"}<span className="token keyword">const</span> client <span className="token operator">=</span> <span className="token keyword">new</span> <span className="token className-name">WSClient</span><span className="token punctuation">(</span><span className="token punctuation">{"{"}</span>
                        {"\n"}    host<span className="token punctuation">:</span> <span className="token string">"-- url to cloud service --"</span><span className="token punctuation">,</span>
                        {"\n"}    secretKey<span className="token punctuation">:</span> <span className="token string">"-- secret key --"</span><span className="token punctuation">,</span>
                        {"\n"}    groupId<span className="token punctuation">:</span> <span className="token string">"-- identifier of the task group --"</span>
                        {"\n"}<span className="token punctuation">{"}"}</span><span className="token punctuation">)</span><span className="token punctuation">;</span>
                    </code>
                </pre>
                {/* Listening */}
                <h3 id="listening-to-events">Listening to events</h3>
                <p>You can listen to events such as connect and disconnect using the initialized client.</p>
                <pre className=" language-js">
                    <code className="prism  language-js">
                        <span className="token comment">// connect</span>
                        {"\n"}client<span className="token punctuation">.</span><span className="token function">on</span><span className="token punctuation">(</span><span className="token string">"connect"</span><span className="token punctuation">,</span> <span className="token keyword">function</span><span className="token punctuation">(</span><span className="token punctuation">)</span> <span className="token punctuation">{"{"}</span>
                        {"\n"}    <span className="token comment">// triggered when the connection is established with the cloud service</span>
                        {"\n"}<span className="token punctuation">{"}"}</span><span className="token punctuation">)</span><span className="token punctuation">;</span>
                        {"\n"}<span className="token comment">// disconnect</span>
                        {"\n"}client<span className="token punctuation">.</span><span className="token function">on</span><span className="token punctuation">(</span><span className="token string">"disconnect"</span><span className="token punctuation">,</span> <span className="token keyword">function</span><span className="token punctuation">(</span><span className="token punctuation">)</span> <span className="token punctuation">{"{"}</span>
                        {"\n"}    <span className="token comment">// triggered when the connection is closed with the cloud service</span>
                        {"\n"}<span className="token punctuation">{"}"}</span><span className="token punctuation">)</span><span className="token punctuation">;</span>
                    </code>
                </pre>
                {/* Adding a listener */}
                <h3 id="add-a-listener">Add a listener</h3>
                <p>You can listen to the state changes, errors, and messages which is related to the chained task mentioned when initializing
                    the WSClient.</p>
                <pre className=" language-js">
                    <code className="prism  language-js">
                        client<span className="token punctuation">.</span><span className="token function">addListener</span><span className="token punctuation">(</span><span className="token punctuation">(</span>error<span className="token punctuation">,</span> message<span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token punctuation">{"{"}</span>
                        {"\n"}    <span className="token keyword">if</span> <span className="token punctuation">(</span>error<span className="token punctuation">)</span> <span className="token punctuation">{"{"}</span>
                        {"\n"}        <span className="token keyword">return</span> console<span className="token punctuation">.</span><span className="token function">log</span><span className="token punctuation">(</span>error<span className="token punctuation">)</span><span className="token punctuation">;</span>
                        {"\n"}    <span className="token punctuation">{"}"}</span>
                        {"\n"}    console<span className="token punctuation">.</span><span className="token function">log</span><span className="token punctuation">(</span>message<span className="token punctuation">)</span><span className="token punctuation">;</span>
                        {"\n"}<span className="token punctuation">{"}"}</span><span className="token punctuation">,</span> <span className="token punctuation">(</span>err<span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token punctuation">{"{"}</span>
                        {"\n"}    console<span className="token punctuation">.</span><span className="token function">log</span><span className="token punctuation">(</span>err<span className="token punctuation">)</span><span className="token punctuation">;</span>
                        {"\n"}    client<span className="token punctuation">.</span><span className="token function">close</span><span className="token punctuation">(</span><span className="token punctuation">)</span><span className="token punctuation">;</span>
                        {"\n"}<span className="token punctuation">{"}"}</span><span className="token punctuation">)</span><span className="token punctuation">;</span>
                    </code>
                </pre>
                {/* Create a subroutine in the chained task */}
                <h3 id="create-a-subroutine-in-the-chained-task">Create a subroutine in the chained task</h3>
                <p>Subroutines or tasks can be add to the chained task using the initialized client as follows.</p>
                <pre className=" language-js">
                    <code className="prism  language-js">
                        client<span className="token punctuation">.</span><span className="token function">createTask</span><span className="token punctuation">(</span><span className="token punctuation">{"{"}</span>
                        {"\n"}    taskId<span className="token punctuation">:</span> <span className="token string">"T009"</span><span className="token punctuation">,</span>
                        {"\n"}    groupId<span className="token punctuation">:</span> <span className="token string">"G001"</span><span className="token punctuation">,</span>
                        {"\n"}    name<span className="token punctuation">:</span> <span className="token string">"Test"</span><span className="token punctuation">,</span>
                        {"\n"}    description<span className="token punctuation">:</span> <span className="token string">"Test"</span><span className="token punctuation">,</span>
                        {"\n"}    progress<span className="token punctuation">:</span> <span className="token number">0</span><span className="token punctuation">,</span>
                        {"\n"}    predecessors<span className="token punctuation">:</span> <span className="token punctuation">[</span><span className="token string">"T003"</span><span className="token punctuation">]</span>
                        {"\n"}<span className="token punctuation">{"}"}</span><span className="token punctuation">,</span> <span className="token punctuation">(</span>err<span className="token punctuation">,</span> res<span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token punctuation">{"{"}</span>
                        {"\n"}    <span className="token keyword">if</span><span className="token punctuation">(</span>err<span className="token punctuation">)</span><span className="token punctuation">{"{"}</span>
                        {"\n"}        <span className="token keyword">return</span> console<span className="token punctuation">.</span><span className="token function">log</span><span className="token punctuation">(</span>err<span className="token punctuation">)</span><span className="token punctuation">;</span>
                        {"\n"}    <span className="token punctuation">{"}"}</span>
                        {"\n"}    console<span className="token punctuation">.</span><span className="token function">log</span><span className="token punctuation">(</span>res<span className="token punctuation">)</span><span className="token punctuation">;</span>
                        {"\n"}<span className="token punctuation">{"}"}</span><span className="token punctuation">)</span><span className="token punctuation">;</span>
                    </code>
                </pre>
                {/* Update the progress of a task or a subroutine */}
                <h3 id="update-the-progress-of-a-task-or-a-subroutine">Update the progress of a task or a subroutine</h3>
                <p>The state changes occurred when the progress of a task or a subroutine is updated. You also notify the all clients
                    when a state is changed.</p>
                <pre className=" language-js">
                    <code className="prism  language-js">
                        client<span className="token punctuation">.</span><span className="token function">updateProgress</span><span className="token punctuation">(</span><span className="token punctuation">{"{"}</span>
                        {"\n"}    taskId<span className="token punctuation">:</span> <span className="token string">"T002"</span><span className="token punctuation">,</span>
                        {"\n"}    groupId<span className="token punctuation">:</span> <span className="token string">"G001"</span><span className="token punctuation">,</span>
                        {"\n"}    progress<span className="token punctuation">:</span> <span className="token number">10</span>
                        {"\n"}<span className="token punctuation">{"}"}</span><span className="token punctuation">,</span> <span className="token punctuation">(</span>err<span className="token punctuation">,</span> res<span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token punctuation">{"{"}</span>
                        {"\n"}    <span className="token keyword">if</span><span className="token punctuation">(</span>err<span className="token punctuation">)</span><span className="token punctuation">{"{"}</span>
                        {"\n"}        <span className="token keyword">return</span> console<span className="token punctuation">.</span><span className="token function">log</span><span className="token punctuation">(</span>err<span className="token punctuation">)</span><span className="token punctuation">;</span>
                        {"\n"}    <span className="token punctuation">{"}"}</span>
                        {"\n"}    console<span className="token punctuation">.</span><span className="token function">log</span><span className="token punctuation">(</span>res<span className="token punctuation">)</span><span className="token punctuation">;</span>
                        {"\n"}<span className="token punctuation">{"}"}</span><span className="token punctuation">)</span><span className="token punctuation">;</span>
                    </code>
                </pre>
                {/* Notify an error */}
                <h3 id="notify-an-error">Notify an error</h3>
                <p>When a subroutine is executed, errors may occur and it is requires to notify all the client about the error.</p>
                <pre className=" language-js">
                    <code className="prism  language-js">
                        client<span className="token punctuation">.</span><span className="token function">notifyError</span><span className="token punctuation">(</span><span className="token punctuation">{"{"}</span>
                        {"\n"}    timestamp<span className="token punctuation">:</span> <span className="token keyword">new</span> <span className="token class-name">Date</span><span className="token punctuation">(</span><span className="token punctuation">)</span><span className="token punctuation">.</span><span className="token function">getTime</span><span className="token punctuation">(</span><span className="token punctuation">)</span><span className="token punctuation">,</span>
                        {"\n"}    groupId<span className="token punctuation">:</span> <span className="token string">"G001"</span><span className="token punctuation">,</span>
                        {"\n"}    name<span className="token punctuation">:</span> <span className="token string">"Info"</span><span className="token punctuation">,</span>
                        {"\n"}    message<span className="token punctuation">:</span> <span className="token string">"Test Message"</span>
                        {"\n"}<span className="token punctuation">{"}"}</span><span className="token punctuation">,</span> <span className="token punctuation">(</span>err<span className="token punctuation">,</span> res<span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token punctuation">{"{"}</span>
                        {"\n"}    <span className="token keyword">if</span><span className="token punctuation">(</span>err<span className="token punctuation">)</span><span className="token punctuation">{"{"}</span>
                        {"\n"}        <span className="token keyword">return</span> console<span className="token punctuation">.</span><span className="token function">log</span><span className="token punctuation">(</span>err<span className="token punctuation">)</span><span className="token punctuation">;</span>
                        {"\n"}    <span className="token punctuation">{"}"}</span>
                        {"\n"}    console<span className="token punctuation">.</span><span className="token function">log</span><span className="token punctuation">(</span>res<span className="token punctuation">)</span><span className="token punctuation">;</span>
                        {"\n"}<span className="token punctuation">{"}"}</span><span className="token punctuation">)</span><span className="token punctuation">;</span>
                    </code>
                </pre>
                {/* Get all the tasks or subroutines */}
                <h3 id="get-all-the-tasks-or-subroutines">Get all the tasks or subroutines</h3>
                <p>You can get the details of all the task in the chained tasks as follows.</p>
                <pre className=" language-js">
                    <code className="prism  language-js">
                        client<span className="token punctuation">.</span><span className="token function">getAllTasks</span><span className="token punctuation">(</span><span className="token punctuation">(</span>err<span className="token punctuation">,</span> res<span className="token punctuation">)</span> <span className="token operator">=&gt;</span> <span className="token punctuation">{"{"}</span>
                        {"\n"}    <span className="token keyword">if</span><span className="token punctuation">(</span>err<span className="token punctuation">)</span><span className="token punctuation">{"{"}</span>
                        {"\n"}        <span className="token keyword">return</span> console<span className="token punctuation">.</span><span className="token function">log</span><span className="token punctuation">(</span>err<span className="token punctuation">)</span><span className="token punctuation">;</span>
                        {"\n"}    <span className="token punctuation">{"}"}</span>
                        {"\n"}    console<span className="token punctuation">.</span><span className="token function">log</span><span className="token punctuation">(</span>res<span className="token punctuation">)</span><span className="token punctuation">;</span>
                        {"\n"}<span className="token punctuation">{"}"}</span><span className="token punctuation">)</span><span className="token punctuation">;</span>
                    </code>
                </pre>
                <h3 id="advanced-guides-and-docs">Advanced guides and docs</h3>
                <p>You can refer the API on /* url */ for more details</p>
            </div>
        );
    }
}

export default Documentation;